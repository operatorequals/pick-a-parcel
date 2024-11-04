import Peer from PeerJS

const PeerJSMatchmakingID = "pick-a-parcel-3b0ca7c0-c910-4794-86fb-94e4fa5503d5"



const randomMatch = () => {
	const peer = new Peer(
			// {debug: 1}
		);

	peer.on('error', (e)=>{
		console.log("PeerJS EROOR+", e)
	})

	const dataConnection = peer.connect(PeerJSMatchmakingID)
}


randomMatch()