**General functionality:**

- Code Base: Refer to [angular-realworld-example-app ](https://github.com/gothinkster/angular-realworld-example-app)
    + But it has worst code structure and monolithic Architecture
    + Angular: ^15.2.3
    + NodeJs: ^14.20.0 || ^16.13.0 || ^18.10.0

- What I do:
    + Refactor this project based on Best Practice Structure:
        + [PR #1](https://github.com/trungtrong/angular-realworld-example-upgrades/pull/1)
    + Refactor all components, directives, pipes, modules, routes, main.ts by using Standalone
        + [PR #3](https://github.com/trungtrong/angular-realworld-example-upgrades/pull/3)
    + Upgrade to Angular v16.12.2
        + Enable Vite and esbuild for Angular CLI
    + Upgrade to Angular v17.3.12
        + Apply Control Flow syntax
        + Apply DestroyRef and takeUntilDestroyed.
        + Refactor Interceptor by using HttpInterceptorFn
    + Upgrade to Angular v18.2.13
