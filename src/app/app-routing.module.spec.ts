import { routes } from './app-routing.module';

describe('Test App Routing', () => {
  it('should path blanc', () => {
    expect(routes[0].path).toBe('');
    expect(routes[0].redirectTo).toBe('posts');
  });
  it('Should path posts ', () => {
    expect(routes[1].path).toBe('posts');
  });
  it('Should path post/id ', () => {
    expect(routes[2].path).toBe('post/:id');
  });
  it('Should path 404 ', () => {
    expect(routes[3].path).toBe('404');
    expect(routes[4].path).toBe('404/:id');
  });
  it('Should path cualquiera ', () => {
    expect(routes[5].path).toBe('**');
    expect(routes[5].redirectTo).toBe('404');
  });
});
