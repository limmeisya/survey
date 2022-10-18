import { NullValuePipe } from './null-value.pipe';

describe('NullValuePipe', () => {
  it('create an instance', () => {
    const pipe = new NullValuePipe();
    expect(pipe).toBeTruthy();
  });
});
