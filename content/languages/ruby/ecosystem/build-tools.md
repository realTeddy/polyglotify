---
title: "Build Tools"
language: "ruby"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Ruby's primary build tool is **Rake**, a Make-like tool written in Ruby. Rake tasks are defined in a `Rakefile` using a Ruby DSL. Rails extends Rake with tasks for database migrations, test runs, and asset compilation. For gem publishing, `gem build` and `gem push` are used.

## Example

```ruby
# Rakefile
require 'rake/testtask'
require 'rubocop/rake_task'

# Default task
task default: [:test, :lint]

# Test task
Rake::TestTask.new(:test) do |t|
  t.libs      << "test"
  t.test_files = FileList["test/**/*_test.rb"]
  t.verbose   = true
end

# Lint task
RuboCop::RakeTask.new(:lint)

# Custom task
desc "Print current version"
task :version do
  require_relative 'lib/my_gem/version'
  puts MyGem::VERSION
end

# Task with dependency
desc "Build and publish gem"
task publish: [:test, :build] do
  sh "gem push pkg/my_gem-#{MyGem::VERSION}.gem"
end

task :build do
  sh "gem build my_gem.gemspec"
end
```

```bash
rake           # run default task
rake test      # run tests
rake -T        # list all available tasks
```

## Gotchas

- `sh` in Rake runs a shell command and raises an error if it fails
- `task :name => [:dep1, :dep2]` runs dependencies first; Rake ensures each task runs only once per invocation
- Rails ships with many predefined Rake tasks; run `bin/rails --tasks` to list them
