import {HideZeroPipe} from './hide-zero.pipe';

fdescribe('HideZeroPipe', () => {
  let pipe: HideZeroPipe;
  beforeEach(() => {
    pipe = new HideZeroPipe();
  });
  fit('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  fit('should return null if receive zero', () => {
    expect(pipe.transform(0)).toBe(null);
  });
  fit('should return same value', () => {
    expect(pipe.transform(10)).toBe(10);
  });
});
