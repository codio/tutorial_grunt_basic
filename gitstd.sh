if [ -z $1]
  then
    echo 'supply message'
    exit 0
fi
git add .
git commit -a -m '$1'
git push
