import { execSync } from "child_process";
const runCmd = (cmd) => {
        try {
            execSync(`${cmd}`, { stdio: "inherit" });
        } catch (e) {
            console.error(e.message);
            return false;
        }
        return true;
    },
    repoName = process.argv[2] || "ioc-challenge-" + new Date().getFullYear(),
    gitCheckoutCmd = `git clone --depth 1 https://github.com/MicroClub-USTHB/ioc-starter.git ${repoName}`,
    installDepsCmd = `cd ${repoName} && npm install`;
console.log(`Cloning the repository with name ${repoName}`);
const checkout = runCmd(gitCheckoutCmd);
if (!checkout) process.exit(-1);
console.log(`installing dependencies for ${repoName}`);
const installDeps = runCmd(installDepsCmd);
if (!installDeps) process.exit(-2);
console.log("Congratulation! you are ready. follow the following commands to start");
console.log(`cd ${repoName} && npm start`);
