IMAGE_URL="https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_200/ncom/pt_BR/games/switch/h/hollow-knight-switch/description-image"
BACKGROUND_URL="https://pbs.twimg.com/media/GsfZ9c5b0AQfhqG?format=jpg&name=4096x4096"

curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"
npx autocannon --renderStatusCodes -c 500 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"