
IMAGE="boardgameio-react"
PORT="3000"

build-image:
	docker build -t $(IMAGE) .

build: build-image
	mkdir -p build/
	docker run -ti -v`pwd`/build:/app/build $(IMAGE) build


run: build-image
	docker run -ti -p3000:3000 $(IMAGE) start 

