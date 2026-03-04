# 🔨 Installation

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js 20+ _(optional — only needed to run the local dev server)_
- [pre-commit](https://pre-commit.com/) _(required for contributors)_

## 🚀 Quick Install

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/JuanVilla424/invadrix.git
```

### 2️⃣ Navigate to the Project Directory

```bash
cd invadrix
```

### 3️⃣ Run the Game

**Option A — Open directly in browser (no install needed):**

```bash
open index.html
```

**Option B — Local dev server:**

```bash
npm start
```

The game will be available at `http://localhost:3000`.

## 🛠️ Contributor Setup

If you plan to contribute, install the pre-commit hooks:

```bash
pip install pre-commit
pre-commit install
```

Then verify hooks are working:

```bash
pre-commit run --all-files
```
