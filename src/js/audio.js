class MikuAudio {
    constructor(src){
        this.audioCtx = null;
        this.audioSrc = src;
        this.gainNode = null;
        this.fail = false;
        this.init();
    }
    init(){
        this.createAudioContext();
        this.createAudioDes();
    }
    createAudioContext(){
        try{
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext);
        }catch(e){
            this.fail = true;
            // alert('Web audio is not supported in this browser');
        }
    }
    createAudioDes(){
        if(this.fail) return;
        this.audio = new Audio(this.audioSrc);
        this.source = this.audioCtx.createMediaElementSource(this.audio);
        this.analyser = this.audioCtx.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
    }
    play(){
        if(this.fail) return;
        this.audio.play();
    }
}

export default MikuAudio