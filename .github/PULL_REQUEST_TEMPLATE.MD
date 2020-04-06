**IMPORTANT: Please do not create a Pull Request without creating an issue first.**
*Any change needs to be discussed before proceeding. Failure to do so may result in the rejection of the pull request.*

Thanks for submitting a pull request! Please provide enough information so that others can review your pull request

## Pull request checklist

Please, go through  the steps before you submit a PR.

_If you're unsure about any of them, don't hesitate to ask. We're here to help! 
This is simply a reminder of what we are going to look for before merging your code._

_Change to PREVIEW mode, so you can check the options_ 

1. Make sure that your PR is not a duplicate, see the [Pull Request](https://github.com/ecureuill/SELIProject/pulls) list.

2. If note, then make sure that:
    
    - [ ] You have done your changes in a separate branch. Branches MUST have descriptive names that start with either the hotfix/ or feature
  
    - [ ] You have a descriptive commit message with a short title (first line).
  
    - [ ] You have only one commit (if not, squash them into one commit).
  
    ~~- [ ] `npm test` doesn't throw any error. If it does, fix them first and amend your commit (git commit --amend).~~

    - [ ] Your pull request SHOULD ONLY target the `master` or `next`branch, if this is a hot-fix for production or next release. 
    You probably want to target `dev` instead.

    - [ ] Give a descriptive title to your PR.
    
    - [ ] Your code follows our guidelines.

    - [ ] I have added tests that prove my fix is effective or that my feature works
    
    - [ ] Build (`npm run build`) was run locally and any changes were pushed
    
    - [ ] Lint (`npm run lint`) has passed locally and any fixes were made for failures
    
    - [ ] Docs have been reviewed and added / updated if needed

IMPORTANT: Please review the [CONTRIBUTING.md](https://github.com/ecureuill/SELIProject/wiki/contributing) file for detailed contributing guidelines.

:point_up::point_up: **PLEASE REMOVE THIS TEMPLATE ABOVE BEFORE SUBMITTING** :point_up::point_up:


## Types of changes
What types of changes does your code introduce?

<!-- Please do not submit updates to dependencies unless it fixes an issue. --> 

<!-- Please try to limit your pull request to one type, submit multiple pull requests if needed. --> 

- [ ] Bugfix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected) <!-- If this introduces a breaking change, please describe the impact and migration path for existing applications in FUTHER COMMENTS section. -->
- [ ] Documentation Update (if none of the other choices apply)


## What is the current behavior? 
<!-- Please describe the current behavior that you are modifying, or link to a relevant issue. -->

-
-
- `solves #XXXX` <!-- to auto-close the issue that your PR fixes (if such) -->


## Test plan
Demonstrate the code is solid. Example: The exact commands you ran and their output, screenshots / videos if the pull request changes UI.

## Further comments

If this is a relatively large or complex change, kick off the discussion by explaining why you chose the solution you did and what alternatives you considered, etc...
