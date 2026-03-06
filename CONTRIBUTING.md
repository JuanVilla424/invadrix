# 🤝 Contributing to invadrix

We welcome contributions to invadrix! To make sure the process goes smoothly, please follow these guidelines:

## 📋 Code of Conduct

Please note that all participants in our project are expected to follow our [Code of Conduct](#-code-of-conduct). Make sure to review it before contributing.

## 🛠️ How to Contribute

1. **🍴 Fork the repository**:
   Fork the project to your GitHub account using the GitHub interface.

2. **🌿 Create a new branch**:
   Use a descriptive branch name for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **✏️ Make your changes**:
   Implement your feature or fix the bug in your branch. All game code must live inside `index.html`. Follow the [Game Architecture Rules](CLAUDE.md) — no sprites, no external dependencies, Canvas 2D only.

4. **🧪 Test your changes**:
   Open `index.html` in a browser and verify the game runs correctly. Run the test suite:

   ```bash
   npm run test
   ```

5. **💬 Commit your changes**:
   Use the project commit format:

   ```bash
   git commit -m "feat(core): description of changes"
   ```

6. **📤 Push your changes**:
   Push your changes to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

7. **📬 Submit a Pull Request**:
   Create a pull request on the main repository, detailing the changes you've made. Link any issues your changes resolve and provide context.

## 📑 Guidelines for Contributions

- **🔍 Lint your code** before submitting a pull request. Run `pre-commit run --all-files` to check formatting.
- **✅ Ensure test coverage** for any new game logic you add.
- **📝 Write clear, concise commit messages** using the format `type(core): description`.
- **🗂️ Keep all code in `index.html`** — do not create separate JS or CSS files.
- **🚫 No runtime dependencies** — do not add CDN scripts or npm packages to the game.

Thank you for helping improve invadrix!

---

## 📜 License

2026 — This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). You are free to use, modify, and distribute this software under the terms of the GPL-3.0 license. For more details, please refer to the [LICENSE](LICENSE) file included in this repository.
