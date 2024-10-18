
IMAGE="boardgameio-react:latest"
PORT="3000"

build-image:
	docker build -t $(IMAGE) .

build: build-image
	mkdir -p build/
	docker run -ti --rm -v`pwd`/build:/app/build $(IMAGE) build


run: build-image
	docker run -ti --rm -p3000:3000 $(IMAGE) start 


dev: build-image
	docker run -ti --rm \
	-v`pwd`/src:/app/src \
	-v`pwd`/public:/app/public \
	-p3000:3000 \
	$(IMAGE) start 


exec:
	docker exec -ti \
		`docker ps --filter ancestor=$(IMAGE) --format json | jq -r .ID` \
		sh
