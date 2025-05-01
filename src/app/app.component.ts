import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./componentes/nav/nav.component";
import {NgxSpinnerModule} from "ngx-spinner"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RankingExploradores';
}
