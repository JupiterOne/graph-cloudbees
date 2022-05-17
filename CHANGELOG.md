# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.1.0 - 2022-05-17

### Added

- Added hostname validation

### Fixed

- Fixed the way user names are passed in the `build-user-group-relationships`
  step which previously caused some relationships not to be built (depending on
  the name-value).
- Fixed small typo in development.md
- Fixed the issue where node-fetch wouldn't throw error on non-ok responses
- Uppercased letter 'B' of CloudBees in repository

## 1.0.0 - 2022-04-20

### Added

- Ingest new entities
  - `cloudbees_account`
  - `cloudbees_role`
  - `cloudbees_user`
  - `cloudbees_group`
- Build new relationships
  - `cloudbees_account_has_group`
  - `cloudbees_account_has_role`
  - `cloudbees_account_has_user`
  - `cloudbees_group_assigned_role`
  - `cloudbees_group_has_user`
