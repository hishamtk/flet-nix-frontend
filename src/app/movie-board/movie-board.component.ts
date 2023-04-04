import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-movie-board',
  templateUrl: './movie-board.component.html',
  styleUrls: ['./movie-board.component.scss'],
})
export class MovieBoardComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'show_id',
    'title',
    'type',
    'cast',
    'rating',
    'action',
  ];
  data: Movie[] = [];
  
  type = "";

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngAfterViewInit(): void {
    this.getAllMovies();
  }

  getAllMovies(search = '') {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.api!.getMovies(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            search,
            this.type
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalPages;
          return data.movies;
        })
      )
      .subscribe((data) => (this.data = data));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let search = filterValue.trim().toLowerCase();

    this.getAllMovies(search);
  }

  callApiWithType(event:Event){
    this.getAllMovies()
  }

  logOut() {
    let clearItem = this.authService.logout();
    this.router.navigate(['login']);
  }

  async viewMovie(id: string) {
    this.api.getOneMovie(id).subscribe({
      next: (res) => {
        this.dialog.open(DialogComponent, {
          width: '45%',
          data: res.movie[0],
        });
      },
    });
  }
}

export interface MovieApi {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
}

export interface Movie {
  _id: string;
  show_id: string;
  type: string;
  title: string;
  rating: string;
  cast: string;
}
