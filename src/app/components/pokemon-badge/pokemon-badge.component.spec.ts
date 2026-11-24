import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonBadgeComponent } from './pokemon-badge.component';

describe('PokemonBadgeComponent', () => {
  let component: PokemonBadgeComponent;
  let fixture: ComponentFixture<PokemonBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});