
# csv-make

Generate a [CSV][] file of [user accounts for upload][upload] to [Moodle][].

## Install .. build

```
npm install

npm run copy-config

vi ./config.json

npm run build

npm test  # Run JSON lint.
```

You may find this [JSON validator][] useful! :heart:

## License

License: [MIT][]

[mit]: https://nfreear.mit-license.org/
[moodle]: https://moodle.org/ "Moodle — Open-source learning platform"
[upload]: https://docs.moodle.org/en/Upload_users "Upload users to Moodle"
[csv]: https://en.wikipedia.org/wiki/Comma-separated_values "comma-separated values (CSV) file"
[json validator]: https://codebeautify.org/jsonvalidator
