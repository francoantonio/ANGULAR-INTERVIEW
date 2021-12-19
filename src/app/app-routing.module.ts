import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { PostDetailComponent } from './Pages/post-detail/post-detail.component';
import { PostListComponent } from './Pages/post-list/post-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'posts' },
  { path: 'posts', component: PostListComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '404', component: NotFoundComponent },
  { path: '404/:id', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
