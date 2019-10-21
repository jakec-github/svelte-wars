<script>
  export let name = "Who even is this?";
  export let src =
    "https://starwars-visualguide.com/assets/img/characters/24.jpg";
</script>

<style>
  div {
    display: inline-block;
    border: 2px solid black;
    border-radius: 5px;
    background-color: gray;
    max-width: 150px;
    overflow: hidden;
    height: 220px;
  }

  img {
    width: 150px;
    border-top: 1px solid black;
  }

  p {
    display: block;
    width: 150px;
    color: white;
    text-align: center;
    font-size: 18px;
    font-family: "body";
  }
</style>

<div>
  <p>{name}</p>
  <img {src} alt="Star wars character" />
</div>
