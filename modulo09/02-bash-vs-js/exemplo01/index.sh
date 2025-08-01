FOLDER_AMOUNT=4

for index in $(seq 1 $FOLDER_AMOUNT); do
    folder=$([ $index -ge 3 ] && echo bash-0$index || echo shell-0$index)

    mkdir -p $folder

    cd $(pwd)/$folder
    
    npm init -y --silent --scope @dgondra
    cat package.json
    cd ..
done

rm -rf bash* shell*