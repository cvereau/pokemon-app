import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListViewComponent } from './pokemon-list-view.component';

describe('PokemonListViewComponent', () => {
  let component: PokemonListViewComponent;
  let fixture: ComponentFixture<PokemonListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
