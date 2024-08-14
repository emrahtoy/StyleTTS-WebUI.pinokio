module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/JarodMica/StyleTTS-WebUI app"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "git submodule init",
          "git submodule update --remote --recursive"
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "venv",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "requirements.txt.bak",
        dest: "app/requirements.txt"
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "venv",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "pip install gradio devicetorch",
          "pip install -r requirements.txt",
          "pip install ./modules/StyleTTS2/",
          "python ./modules/StyleTTS2/styletts2/download_punkt.py"
        ]
      }
    },
    {
      method: "fs.download",
      params: {
        uri: [
          "https://huggingface.co/yl4579/StyleTTS2-LibriTTS/blob/main/Models/LibriTTS/epochs_2nd_00020.pth",
          "https://huggingface.co/yl4579/StyleTTS2-LibriTTS/blob/main/Models/LibriTTS/config.yml",
        ],
        dir: "app/models/pretrain_base_1/"
      }
    },
    /* {
      method: "fs.link",
      params: {
        venv: "app/venv"
      }
    } */
  ]
}
