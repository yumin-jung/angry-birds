class ScoreDisplay {
    constructor() {
        this.score = 0;
    }
    resetScore() {
        this.score = 0;
        document.getElementById('score').innerHTML = `Score: ${this.score}`;
    }
    addScore(scoreToAdd) {
        this.score += scoreToAdd;
        console.log('ss');
        document.getElementById('score').innerHTML = `Score: ${this.score}`;
    }
    update(source, ...others) {
        if (source == 'updateScore') {
            const { remainingBirds } = others[0];
            const { scoreToAdd } = others[1];
            this.addScore(scoreToAdd);
        }
    }
}

export { ScoreDisplay };
