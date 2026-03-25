---
title: "Project Structure"
language: "ruby"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Ruby gem and application layouts follow well-established conventions. A gem uses a structure created by `bundle gem`; a Rails application has its own prescribed layout. The `lib/` directory holds the main code, `spec/` or `test/` holds tests, and `bin/` holds executables.

## Example

```
my_gem/
├── bin/
│   └── console          # interactive REPL for the gem
├── lib/
│   ├── my_gem.rb        # main entry point
│   └── my_gem/
│       ├── version.rb
│       └── client.rb
├── spec/
│   ├── spec_helper.rb
│   └── my_gem_spec.rb
├── Gemfile
├── Gemfile.lock
├── my_gem.gemspec       # gem metadata & dependencies
├── Rakefile
└── README.md

# Rails application layout
app/
├── controllers/
├── models/
├── views/
├── services/
config/
├── routes.rb
├── database.yml
db/
├── schema.rb
└── migrate/
```

## Gotchas

- The gemspec file defines the gem's public API, dependencies, and metadata for publication to RubyGems.org
- Rails' `autoload_paths` automatically loads files in `app/` based on naming conventions — class `UserService` must be in `app/services/user_service.rb`
- `require_relative` is preferred over `require` for loading local files within a gem
