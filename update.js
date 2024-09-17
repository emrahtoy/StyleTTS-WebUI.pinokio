module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      message: [
        "git pull",
        "git submodule init",
        "git submodule update --remote --recursive",
        "pip install -r requirements.txt",
        "pip uninstall -y StyleTTS2",
        "pip install ./modules/StyleTTS2"
      ]
    }
  }]
}
