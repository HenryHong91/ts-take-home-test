## Henry Hong

This project is organized with a simple layered structure to keep responsibilities clear and make the code easy to extend and reason about.

### Frontend

The frontend is divided into three layers to separate network concerns, business logic, and UI rendering.

- **Network layer**  
  Handles HTTP communication and network-level errors only.

- **Service layer**  
  Responsible for defining API requests (endpoint, headers, body), validating responses at runtime, and transforming data.  
  This layer is independent from the UI and focuses on reuse.

- **UI layer**  
  Uses hooks to consume service data, manage loading and error states, and render errors in the UI.  
  No direct network or data-fetching logic.

### Backend

The backend is structured to keep request handling explicit and predictable.

- **Route**  
  Receives requests, controls the flow, and returns responses.

- **Validation**  
  Validates incoming requests based on shared schemas.

- **Service**  
  Contains business logic and coordinates operations.

- **Operation**  
  Executes database queries and handles low-level data access concerns.

- **Error handling**  
  A centralized error middleware handles errors across all layers.

### Shared Types

Schemas are placed in a shared `lib` so both frontend and backend rely on the same source of truth for types and contracts.



============================================================================================


# Take-Home Test (TypeScript)

This is a template for a take-home test. See the [Instructions][Instructions]
for details on the activity.

**Set Up Your Repository**

1. On the top right corner of this page, click the "Use this template" button
2. Select "Create Your Own Repository" from the dropdown
3. Give the repository a name under your Github account, and click "Create a new repository"
4. Follow the below instructions to complete the exercise

**Submit Your Work**

Once you’ve completed the task, please add the `tracksuit-technical-test` Github user as a collaborator, and share the repo link with the talent manager.

<!-- Link definitions -->

[DenoInstall]: https://docs.deno.com/runtime/getting_started/installation/
[Flake]: ./flake.nix
[Instructions]: ./Instructions.md

## Setup

Install Deno 2 using your preferred method--typically this would be your
system's package manager. See [Deno's installation instructions][DenoInstall] to
find the command that's right for you.

<!-- deno-fmt-ignore-start -->

> [!Tip]
> Nix users can use `nix develop` to install tools declared in this repo's
> [Flake][] .

<!-- deno-fmt-ignore-end -->

This repo was developed against Deno 2.1.2.

## Common tasks

Most of the commands you'll need are provided by the Deno toolchain. You can run
tasks either from the repo root or within each package

### Running client and server

```sh
deno task dev
```

### Typechecking

```sh
deno check .
```

### Linting

```sh
deno lint
```

### Formatting

```
deno fmt
```
