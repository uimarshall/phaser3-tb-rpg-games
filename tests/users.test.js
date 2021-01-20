import Model from '../src/helpers/Model';

describe('The username should be set and read', () => {
  it('Should set the user name', () => {
    Model.userName = 'Marshall';
    expect(Model.userName).not.toBe('Fred');
  });

  it('Should get the user name', () => {
    expect(Model.userName).toBe('Marshall');
  });
});
