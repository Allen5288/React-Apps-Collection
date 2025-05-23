# Git

This note is based on Chris's Lecture 05 Git framework, supplemented with content from W3school, aimed at assisting the 26th Full Stack video cohort in building a basic learning framework.

## Table of Contents

- [1. Why Use Version Control](#1-why-use-version-control)
- [2. Centralized & Distributed Version Control](#2-centralized--distributed-version-control)
- [3. Git and GitHub](#3-git-and-github)
- [4. How to Set Up Git and Basic Commands](#4-how-to-set-up-git-and-basic-commands)
- [5. Branch and Merge](#5-branch-and-merge)
- [6. Remote Collaboration](#6-remote-collaboration)

## 1. Why Use Version Control

1. History tracking and review
2. Collaborative work
3. Backup and recovery
4. Reverting changes or rolling back versions
5. Branching and merging
6. Version tagging
7. Experimenting with new features using branches

## 2. Centralized & Distributed Version Control

![git_central_and_distributed](./assets/images/git_central_and_distributed.png)

### 2.1 Centralized (represented by Subversion)

Working files are all stored in a central repository. Team members download the files they need to work on from the central repository, update them, and commit changes. These team members only have the files they've downloaded for modification locally.

- Origin: Traditional software development companies where, because the code is not open source, the source code is kept in the company's central repository. You only download the parts of the code you need for your work, and make changes locally.
- Also provides various version control features:
  - Log: Provides history records
  - Merge: File merging
  - Revert: Version rollback
  - Branch: Version branching

### 2.2 Distributed (represented by Git)

- In Open Source development, there's no central repository set up, so there's a remote repository; locally there's a local repository, not just a working copy, but a complete repository. Through `pull`/`fetch` you get the complete files from the remote repository, including the complete log; through `push` you submit modified files.
- Distributed version control: There is no centralized server; you have a complete repository locally.
- Large companies are also gradually migrating projects to Git.

## 3. Git and GitHub

GitHub provides a third-party, free, open-source hosting platform that acts as a remote repository for other developers.

- It also allows for: review, discussion, pull requests, and publishing projects.
- GitHub's free platform doesn't mean it's completely free:
  - Free for: small businesses (open source software), open source projects, personal use.
  - Paid for: private repositories, enterprise features, integrations.
- The repository owner has management rights over the repository; each participant has a local repository that syncs with the remote repository (download and push).

Other GitHub features:

- GitHub Copilot is an AI coding assistant developed through a collaboration between GitHub and OpenAI, which requires payment.
- Advanced Security includes static code scanning, dynamic analysis, vulnerability and weakness scanning, etc.
- Actions can be used for DevOps CI/CD pipelines.

> Git is a CLI (Command Line Interface) tool.
>
> - However, Git also has various graphical user interface tools, also called GUIs. In practice, these aren't necessary, as VS Code can install GUI plugins that work well.

## 4. How to Set Up Git and Basic Commands

Installing Git:
<https://git-scm.com/>

Check the installed Git version:  
`git --version`
> It's not necessary to install the latest version; just make sure to keep the major version up to date. Keeping the first two digits consistent is sufficient.

### 4.1 Basic Git Setup  

- Global Setup  
  - `git config --global user.name "<Full Name>"` - Developer's Real Name
  - `git config --global user.email "<email>"`  
    - Use your company email for work
    - Use the email registered with GitHub for personal projects
  - `git config --global color.ui auto`
  - `git config --global merge.conflictstyle diff3`  
  - `git config --global core.editor "code --wait"`
    - Tells Git which IDE to use, 'code' represents VS Code
    - After configuring 'code', you can directly use the command `code .` to open the current directory in your IDE
  - `git config --list --global` - View config list
  > Git uses global setup by default
- Project Setup
  - When configuring without using --global, you're setting up project-specific configuration
  - Project setup has higher priority
  ![git_setup](./assets/images/git_setup.jpg)

> If the 'code' command doesn't work on Mac, you can refer to: <https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line>

### 4.2 Git Workflow

![git_summary](./assets/images/git_summary.jpg)

### 4.3 Creating a Local Repository  

Use the commands:

- `git init`
  - Turns the current folder into a git repository, letting Git track changes
  - Don't manually modify the .git folder
- `git clone` (only useful when pulling from a remote repository)

### 4.4 Local Git Workflow

Local commit (also called checkin) consists of two steps:
![git_working_process](./assets/images/git_working_process.jpg)

- Step one: stage  
  - Command line tools
    - stage: `git add <filename>`
    - unstage: `git rm --cached <filename>`
      - --cached: This option tells Git to only remove the file from the staging area (Index), not the actual file in the working directory
      - Without --cached, Git will stop tracking the file, which is rarely needed
    - Use `git status` to check the local repository status for untracked or modified files
  - You can also view and manage git staging in VS Code's Source Control panel on the left. The capital letters after files indicate their status:  
    - U - Untracked  
    - A - Added
    - M - Modified
- Step two: commit
  - Command line tools
    - `git commit -m "message"`
      > The message is mandatory and should be meaningful
    - `git log` is used to display commit history
    > Question: After `git commit`, you can't remove the file anymore, right?  
    Answer: That's correct
  - You can also view and manage git commits in VS Code's Source Control panel.

  Commit messages can follow this format:

  ![commit_msg_format](./assets/images/commit_msg_format.png)

> Useful VS Code Git plugin:  
<https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory>

Typical workflow in professional environments:

1. git checkout -b feat/XX-NUM-UPDATE
2. working on the task, make changes on files
3. select, pick changed file and stage files
    - git add "fileName"
4. add commit msg
    - git commit -m "..."
    - enter msg in source control, and tick
5. publish/push
    - git push --
    - publish in sc
6. create pull request

### 4.5 `Git stash` Command

`git stash` creates a temporary storage area that doesn't enter version control history

- `git stash list` - View the stash list
- `git stash pop` - Get the most recent stash
- `git stash apply <number>`

> Stash is used between commits, as a snapshot for work that isn't ready to be committed yet

### 4.6 Undo Change

- `git checkout .` restores the local working directory to the latest version
  - You can also use the discard option in the VS Code graphical interface
- `git clean` deletes all new files that don't exist in the history, which will show an error: refuse to clean; it requires forced operation.
  - Therefore, use `git clean -f` to force clear
- `git revert` rolls back changes. Revert records the rollback action and creates a new commit, so it can be used.
  - `git revert <SHA>`
  - You can revert a revert
- `git reset` rolls back changes. Companies often don't allow this, but you have permission for your local repository. It removes commits from the history.
  - Reset doesn't reset a specific commit, but resets to a target state
  - `soft reset` - content that is reset is placed in the working folder
      > `git reset` defaults to `soft reset`
  - `hard reset` - the opposite

> If you don't want to push the currently committed version during `git push`, you must use one of the undo methods to roll back to the version you want to commit, then push.  
> Records of local reverts will be uploaded to the remote repository.  
> Records of local resets will not be uploaded to the remote repository.

### 4.7 Other Useful Commands

Generate text or graphical log records

- Push to remote: `git push origin`

- Text: `git log`
- Graphical: `git log --all --decorate --oneline --graph`

Use `git diff <SHA> <SHA>` to compare two versions

- Generally easier to use a graphical interface for comparison
- You can use git blame to find issues in others' code
  - Right-click on code and select view file history or view line history

## 5. Branch and Merge

### 5.1 Creating Branches

- `git checkout -b <branchName>`

  > Each new work item/ticket needs a new branch

  > Everyone uses different branches

  > Pull code from others' branches, don't use their branches directly

  > Branch naming should be meaningful. Naming convention: Follow your company's naming convention  
  > Example: `<ticket>/<ticket-number>-<title>`  
  > Example: `feat/JR-101-create-for-home-page`

Switching branches:

- `git checkout <branchName>`

Deleting branches:

- `git branch -D <branchName>`
  > In professional environments, you typically create branches but don't delete them

### 5.2 Merge

Merge from - `git merge <branchName>`

> Because people commit code every day, you should pull the latest code from the master branch every day when starting work, merge it into your own branch, and then begin working. This reduces conflicts and ensures you're working with the latest code.
>
> - Sometimes conflicts occur during the pull
> - If conflicts appear, you need to resolve them
> - Therefore, commit small changes frequently rather than making large changes and committing all at once

> A tool to help understand git: <https://git-school.github.io/visualizing-git/#free>

## 6. Remote Collaboration

### 6.1 Pull and Push

Generally, a company's repository already exists, so you typically clone the remote repository content to your local machine:

- `git clone <url>`
  > Don't use `clone` or `git init` inside a git directory, to avoid nested git repositories

- Use `git remote --verbose` to print detailed information
  > The default remote is called origin  
  > In modern workplaces, origin can come from GitHub, though some companies might use their own Git server

- Publish Branch: Push a locally created branch to remote
- Fetch: Pull metadata but don't sync; see what differences exist between local and remote without making changes. Generally, pull is used instead.
- In VS Code, "sync changes" equals pull and push

To submit code from your branch to the master branch:

- Pull Request (PR)
  > Description can be written in Markdown  
  > Companies usually have templates  
  > Typically includes review and test, test csd, code quality  
  > You can specify reviewers  
  > After review, typically the branch owner clicks rebase and merge, though sometimes the reviewer does

### .gitignore File

If you have files in your current repo that you don't want to commit to remote, you can list them in a .gitignore file. You can use the wildcard `*` to match all files of the same type.

```
 *.mp3
 *.mp4
 *.dll
 *.dov
 *.docx
 *.xlsx
 *.pptx
 */lib/*
 */bin/*
 .DS_Store
```

> Templates are available on GitHub

### Rebase and Merge

In Git, merge and rebase are both commands used to incorporate changes from one branch into another, but they work differently and have different effects.

1. Merge:

- How it works: Merge combines the histories of two branches into a new commit, creating a merge commit that has two parent commits, each pointing to the latest commit of the merged branches.

- Effect: The merge commit preserves the independent changes on each branch, forming a merged snapshot. This means you can see the original branch history and changes in the branch.

- Advantages: Merge operations are simple and intuitive, suitable for collaborative development on public branches (like master/main), and preserve the entire branch history.

- Disadvantages: Merge commits increase the complexity of the history, potentially causing branch history confusion, especially when merges happen frequently in team collaboration.

2. Rebase:

- How it works: Rebase changes the base (foundation) of the current branch to the latest commit of another branch, then applies each commit of the current branch to the new base commit, creating a series of new commits and forming a linear commit history.

- Effect: The branch history after rebasing is linear and looks cleaner without merge commits. It "moves" the commits of the current branch to the top of another branch, maintaining the order of commits and providing a clearer commit history.

- Advantages: Rebase makes the commit history clearer and more linear, reducing the confusion caused by merge commits. It provides a cleaner and easier-to-understand commit history.

- Disadvantages: Since rebase rewrites commit history, conflicts may occur during rebasing that need to be manually resolved. Additionally, since rebase modifies commit SHA-1 identifiers, it's not recommended on public branches to avoid confusion.

Summary:
When using Merge, the complete branch history is preserved, suitable for collaborative development on public branches. It produces multiple lines.
When using Rebase, the commit history is linearized, providing a clearer and cleaner commit history, but it should be used cautiously to avoid rebasing on public branches. It results in a single line.

 > You can practice and understand using the simulation tool: <https://git-school.github.io/visualizing-git/#free>

### Local reset followed by push may be rejected

`git push -f` forces push

- Generally should not be used
