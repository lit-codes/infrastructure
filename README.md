# Infrastructure

This is a repo that contains IaC that is used to create our servers.

# Ansible

Is used to configure individual servers using Ansible.

# Kubernetes

Kubernetes configs are inside the `k8s` folder. See [k8s README](k8s/README.md)

# Docker

Contains the Docker helpers to be used mostly in k8s projects. See
[Docker README](docker/README.md)

# Contribution

Decided to help us improving our system? Great! Here's how you can create a
merge request:

1. Make sure to fork this repo
2. Clone the repo from the original page (not your fork)
3. Add a new remote using your fork, optional: call it `dev`
4. Checkout to the `master` branch and pull the latest changes
5. Create a new branch based on `master`, call it something short and
   meaningful, separate words using `-`, e.g. `some-short-description`
6. Push the changes to your fork, e.g. `git push -u dev some-short-description`
7. When you push to your branch, you will see a link under `To create a merge
   request for [branch name], visit:`, open it in your browser to create the
   merge request
8. Make sure these two options are selected in your fork settings:
  - [x] `Automatically delete head branches`
  - [x] `Allow squash merging` (and untick the other options to set this as default)
9. Remember to add the PR to the Trello card you're working on, if there isn't
   any, create one!
