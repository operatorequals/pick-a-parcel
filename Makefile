
IMAGE="boardgameio-react:latest"
PORT="3000"
APP_VERSION=`git describe --tags $(git rev-list --tags --max-count=1)`

build-image:
	docker build -t $(IMAGE) .

build: build-image
	mkdir -p build/
	docker run -ti --rm \
		-e  REACT_APP_VERSION=$(APP_VERSION) \
		-v`pwd`/build:/app/build $(IMAGE) build

test-build:
	mkdir -p build/pick-a-parcel/
	mv build/* build/pick-a-parcel/ || true # this will fail but still do the job
	echo "[+] Serving at: http://192.168.56.101:8000/pick-a-parcel/"
	python3 -m http.server -d build/

run: build-image
	docker run -ti --rm -p3000:3000 $(IMAGE) start

dev: build-image
	docker run -ti --rm \
	-e  REACT_APP_VERSION=$(APP_VERSION) \
	-v`pwd`/src:/app/src \
	-v`pwd`/public:/app/public \
	-p3000:3000 \
	$(IMAGE) start 

exec: # dev
	docker exec -ti \
		`docker ps --filter ancestor=$(IMAGE) --format json | jq -r .ID` \
		sh

recompile:
	docker exec -ti \
		`docker ps --filter ancestor=$(IMAGE) --format json | jq -r .ID` \
		find src/ -exec touch {} \;
