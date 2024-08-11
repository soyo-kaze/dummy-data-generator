# D-generate

Every wanted dummy data to test your applications?

I present to you `D-generate`, provide your data schema or just a description and how much of that data you want to generate. D-generate will generate all that with ease using state of the art LLM by google that is `Gemini`.

## Future development

- [ ] Landing website
- [ ] Download data as file csv or json
- [ ] npx command.
- [ ] Support to use your gemini api key.
- [ ] integration with databases to directly fill data into them.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json", "./tsconfig.app.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
