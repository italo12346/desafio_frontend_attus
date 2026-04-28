import { bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { AppComponent } from "./app/app.component";
import { todoReducer } from "./app/3.2/store/todo.reducer";
import { TodoEffects } from "./app/3.2/store/todo.effects";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore({ todos: todoReducer }),
    provideEffects([TodoEffects]),
  ],
}).catch((err) => console.error(err));
