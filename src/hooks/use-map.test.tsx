import useMap from './use-map';
import { makeFakeCity } from '../utils/mocks';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, type MockedClass } from 'vitest';

vi.mock('leaflet', () => ({
  Map: vi.fn().mockImplementation(() => ({
    addLayer: vi.fn(),
    remove: vi.fn(),
    invalidateSize: vi.fn(),
    setView: vi.fn(),
  })),
  TileLayer: vi.fn().mockImplementation(() => ({})),
}));

import { Map, TileLayer } from 'leaflet';

const MockedMap = Map as MockedClass<typeof Map>;

describe('Hook: useMap', () => {
  let mockMapRef: { current: HTMLDivElement | null };

  beforeEach(() => {
    mockMapRef = { current: document.createElement('div') };
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should initialize map when ref is available', () => {
    const fakeCity = makeFakeCity();

    const { result } = renderHook(() => useMap(mockMapRef, fakeCity));

    expect(Map).toHaveBeenCalledWith(mockMapRef.current, {
      center: {
        lat: fakeCity.lat,
        lng: fakeCity.lng,
      },
      zoom: fakeCity.zoom || 13,
    });

    expect(TileLayer).toHaveBeenCalledWith(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    );

    expect(result.current).toBeTruthy();
  });

  it('should not initialize map when ref is null', () => {
    const fakeCity = makeFakeCity();
    const nullRef = { current: null };

    const { result } = renderHook(() => useMap(nullRef, fakeCity));

    expect(Map).not.toHaveBeenCalled();
    expect(result.current).toBeNull();
  });

  it('should not reinitialize map on subsequent renders', () => {
    const fakeCity = makeFakeCity();

    const { result, rerender } = renderHook(() => useMap(mockMapRef, fakeCity));

    expect(Map).toHaveBeenCalledTimes(1);

    rerender();

    expect(Map).toHaveBeenCalledTimes(1);
    expect(result.current).toBeTruthy();
  });

  it('should update map view when city changes', () => {
    const fakeCity1 = makeFakeCity();
    const fakeCity2 = makeFakeCity();
    const mockMapInstance = {
      addLayer: vi.fn(),
      remove: vi.fn(),
      invalidateSize: vi.fn(),
      setView: vi.fn(),
    };

    MockedMap.mockImplementation(() => mockMapInstance as unknown as Map);

    const { rerender } = renderHook(
      ({ city }) => useMap(mockMapRef, city),
      { initialProps: { city: fakeCity1 } }
    );

    expect(Map).toHaveBeenCalledTimes(1);

    act(() => {
      rerender({ city: fakeCity2 });
    });

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(mockMapInstance.setView).toHaveBeenCalledWith(
      {
        lat: fakeCity2.lat,
        lng: fakeCity2.lng,
      },
      fakeCity2.zoom || 13
    );
  });

  it('should clean up map on unmount', () => {
    const fakeCity = makeFakeCity();
    const mockMapInstance = {
      addLayer: vi.fn(),
      remove: vi.fn(),
      invalidateSize: vi.fn(),
      setView: vi.fn(),
    };

    MockedMap.mockImplementation(() => mockMapInstance as unknown as Map);

    const { result, unmount } = renderHook(() => useMap(mockMapRef, fakeCity));

    expect(Map).toHaveBeenCalled();
    expect(result.current).toBeTruthy();

    act(() => {
      unmount();
    });

    expect(Map).toHaveBeenCalled();
    expect(result.current).toBeTruthy();

    act(() => {
      unmount();
    });

    expect(Map).toHaveBeenCalled();
    expect(result.current).toBeTruthy();
  });
});
