# move the declaration files in the correct directory
for f in dist/src/*/**/*.d.ts; do
  newPath=`echo ${f/\/src/}`
  echo moving "$f" into "$newPath"
  mv "$f" "$newPath"
done

# remove dist/src folder
rm -rf dist/src