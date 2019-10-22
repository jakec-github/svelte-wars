<script>
  export let name = "Who even is this?";
  export let src =
    "https://starwars-visualguide.com/assets/img/characters/24.jpg";
</script>

<style>
  div {
    display: inline-block;
    border: 2px solid #20aeba;
    border-radius: 5px;
    background-color: black;
    max-width: 150px;
    overflow: hidden;
    height: 220px;
    text-align: center;
  }

  p {
    display: block;
    color: white;
    text-align: center;
    font-size: 18px;
    font-family: "body";
    max-width: 140px;
    margin: auto;
  }

  img {
    width: 150px;
    border-top: 1px solid black;
  }
</style>

<div>
  <p>{name}</p>
  <img {src} alt="Star wars character" />
</div>
