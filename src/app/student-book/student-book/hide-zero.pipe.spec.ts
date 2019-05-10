import {HideZeroPipe} from './hide-zero.pipe';

describe('HideZeroPipe', () => {
  let pipe: HideZeroPipe;
  beforeEach(() => {
    pipe = new HideZeroPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return null if receive zero', () => {
    expect(pipe.transform(0)).toBe(null);
  });
  it('should return same value', () => {
    expect(pipe.transform(10)).toBe(10);
  });
});
