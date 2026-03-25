---
title: "Package Manager"
language: "ruby"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Ruby's package manager is **RubyGems** (`gem` CLI), and the standard dependency management tool is **Bundler**. Packages are called "gems". `Gemfile` declares dependencies; `Gemfile.lock` pins exact versions for reproducible installs.

## Example

```ruby
# Gemfile
source "https://rubygems.org"

ruby "3.3.0"

gem "rails", "~> 7.1"          # compatible with 7.1.x
gem "pg", ">= 1.0"
gem "puma"

group :development, :test do
  gem "rspec-rails"
  gem "factory_bot_rails"
end

group :development do
  gem "rubocop", require: false
end
```

```bash
# Install all dependencies
bundle install

# Run a command in the bundled environment
bundle exec rails server

# Add a gem
bundle add httparty

# Show outdated gems
bundle outdated

# Update a specific gem
bundle update rails
```

## Gotchas

- Always run commands with `bundle exec` to use the Gemfile-pinned versions instead of system gems
- `Gemfile.lock` should be committed for applications but gitignored for libraries
- `~> 7.1` means `>= 7.1` and `< 8.0` (pessimistic version constraint)
