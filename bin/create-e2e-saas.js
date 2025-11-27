#!/usr/bin/env node
/**
 * create-e2e-saas
 * E2E SaaS project scaffolder (renamed from create-mern-auth)
 * by Sameer Bagul 🚀
 */

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import chalk from "chalk";
import ora from "ora";
import gradient from "gradient-string";
import figlet from "figlet";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const targetDir = args[0] || "my-e2e-saas";
const doInstall = args.includes("--install") || args.includes("-i");
const templateDir = path.join(__dirname, "../template");

const log = console.log;

function showBanner() {
  console.log(
    "\n" +
      gradient.pastel.multiline(
        figlet.textSync("E2E SAAS", { horizontalLayout: "fitted" })
      )
  );
  console.log(chalk.cyan("⚡ Rapid E2E SaaS Starter for MERN & Small Teams"));
  console.log(chalk.gray("by Sameer Bagul • github.com/Sameer-Bagul\n"));
}

async function copyTemplate() {
  if (fs.existsSync(targetDir)) {
    log(chalk.red(`❗ Directory "${targetDir}" already exists. Aborting.`));
    process.exit(1);
  }

  const spinner = ora("📂 Copying template files...").start();

  await fs.copy(templateDir, targetDir, {
    filter: (src) => {
      const base = path.basename(src);
      if (
        base === "node_modules" ||
        base === ".git" ||
        base === "dist" ||
        base === ".next" ||
        base === ".turbo" ||
        base === ".DS_Store" ||
        base === "package-lock.json"
      ) {
        return false;
      }
      return true;
    },
  });

  spinner.succeed(chalk.green("✔ Template copied successfully!\n"));
}

function renameEnvFiles(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) renameEnvFiles(full);
    else if (item.name === ".env") {
      const newPath = path.join(dir, ".env.example");
      fs.renameSync(full, newPath);
      log(chalk.yellow(`🔒 Renamed .env → .env.example in ${dir}`));
    }
  }
}

function replacePlaceholders() {
  const serverPkg = path.join(targetDir, "server", "package.json");
  const clientPkg = path.join(targetDir, "client", "package.json");

  const update = (file) => {
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, "utf8");
      const updated = data.replace(/\{\{PROJECT_NAME\}\}/g, targetDir);
      fs.writeFileSync(file, updated, "utf8");
    }
  };

  update(serverPkg);
  update(clientPkg);
}

function installDeps() {
  const server = path.join(targetDir, "server");
  const client = path.join(targetDir, "client");

  const install = (dir, label) => {
    const spinner = ora(`📦 Installing ${label} dependencies...`).start();
    try {
      execSync("npm install", { cwd: dir, stdio: "inherit" });
      spinner.succeed(chalk.green(`${label} dependencies installed.\n`));
    } catch (err) {
      spinner.fail(chalk.red(`⚠️ ${label} install failed.`));
      log(chalk.yellow(`   Run manually: cd ${label.toLowerCase()} && npm install\n`));
    }
  };

  install(server, "Server");
  install(client, "Client");
}

async function main() {
  console.clear();
  showBanner();

  log(chalk.white(`🚀 Creating new E2E SaaS project: ${chalk.green(targetDir)}\n`));

  await copyTemplate();
  renameEnvFiles(targetDir);
  replacePlaceholders();

  if (doInstall) {
    installDeps();
  } else {
    log(chalk.gray("⚙️ Skipping dependency installation (default)."));
    log(chalk.gray("   Use --install or -i flag to auto-install dependencies.\n"));
  }

  log(chalk.greenBright("🎉 Setup Complete!\n"));
  log(chalk.whiteBright("Next steps:\n"));
  log(chalk.cyan(`  cd ${targetDir}`));
  log(chalk.cyan("  cd server && npm install"));
  log(chalk.cyan("  cd client && npm install"));
  log(chalk.cyan("  cd server && npm run dev"));
  log(chalk.cyan("  cd client && npm start\n"));
  log(
    "💡 " +
      chalk.gray("Docs & updates: ") +
      chalk.underline("github.com/Sameer-Bagul/create-mern-auth\n")
  );
  log(gradient.instagram("✨ Happy Hacking! 🚀\n"));
}

main().catch((err) => {
  console.error(chalk.red("❌ Error during setup:"), err.message);
  process.exit(1);
});
