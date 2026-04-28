import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  DestroyRef,
  inject,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { catchError, of, tap } from "rxjs";
import { UsersService } from "../../../../core/services/users.service";
import { UsersStore } from "../../store/users.store";
import { User } from "../../../../core/models/user.model";
import {
  cpfValidator,
  phoneValidator,
} from "../../../../shared/validators/custom-validators";

@Component({
  selector: "app-user-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./user-modal.component.html",
  styleUrls: ["./user-modal.component.scss"],
})
export class UserModalComponent implements OnInit, OnChanges {
  @Input() user?: User;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;
  saving = false;
  saveError: string | null = null;

  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private usersStore = inject(UsersStore);
  private destroyRef = inject(DestroyRef);

  get isEdit(): boolean {
    return !!this.user;
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (this.form) this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      email: [this.user?.email ?? "", [Validators.required, Validators.email]],
      name: [
        this.user?.name ?? "",
        [Validators.required, Validators.minLength(3)],
      ],
      cpf: [this.user?.cpf ?? "", [Validators.required]],
      phone: [this.user?.phone ?? "", [Validators.required, phoneValidator()]],
      phoneType: [this.user?.phoneType ?? "CELULAR", Validators.required],
    });
    this.saving = false;
    this.saveError = null;
  }

  onSave() {
    if (this.form.invalid) return;
    this.saving = true;
    this.saveError = null;

    const formData = this.form.value;
    const action$ = this.isEdit
      ? this.usersService.updateUser(this.user!.id, formData)
      : this.usersService.createUser(formData);

    action$
      .pipe(
        tap((user) => {
          if (this.isEdit) {
            this.usersStore.updateUser(user);
          } else {
            this.usersStore.addUser(user);
          }
        }),
        catchError(() => {
          this.saveError = "Erro ao salvar. Tente novamente.";
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((result) => {
        this.saving = false;
        if (result) this.saved.emit();
      });
  }

  onCancel() {
    this.cancelled.emit();
  }

  formatCpf(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    input.value = value;
    this.form.get("cpf")?.setValue(value, { emitEvent: false });
  }

  formatPhone(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, "");
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    input.value = value;
    this.form.get("phone")?.setValue(value, { emitEvent: false });
  }
}
