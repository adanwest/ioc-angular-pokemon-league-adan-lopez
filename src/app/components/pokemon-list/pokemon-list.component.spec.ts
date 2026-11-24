import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../../services/pokemon.service';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  const pokemonServiceMock = {
    pokemons$: of([]),
    loading$: of(false),
    error$: of(null),
    cercar: vi.fn(),
    reintentar: vi.fn(),
    crearPokemon: vi.fn(),
    comprovarExistenciaTerme: vi.fn().mockReturnValue(of(true))
  };

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PokemonService, useValue: pokemonServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ha de marcar error síncron minLengthTrimmed si el terme té menys de 2 caràcters', () => {
    component.termeControl.setValue('P');
    expect(component.termeControl.hasError('minLengthTrimmed')).toBe(true);
  });

  it('ha de marcar error síncron caractersInvalids si conté símbols no permesos', () => {
    component.termeControl.setValue('Pikachu@');
    expect(component.termeControl.hasError('caractersInvalids')).toBe(true);
  });

  it('ha de validar correctament un terme alfanumèric vàlid', async () => {
    vi.useFakeTimers();
    component.termeControl.setValue('Pikachu');
    await vi.advanceTimersByTimeAsync(500);
    vi.useRealTimers();

    expect(component.termeControl.errors).toBeNull();
    expect(component.termeControl.valid).toBe(true);
  });
});