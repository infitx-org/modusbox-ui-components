# this is a workaround because of the "import from 'redux' not being properly resolved"
# the 'rredux' folder name needs to be changed back to 'redux'
mv dist/src/rredux dist/src/redux 

# move the declaration files in the correct directory
for f in dist/src/*/**/*.d.ts; do
  newPath=`echo ${f/\/src/}`
  echo moving "$f" into "$newPath"
  mv "$f" "$newPath"
done

# remove dist/src folder
rm -rf dist/src