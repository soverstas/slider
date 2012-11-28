<!DOCTYPE html>
<html>
  <head>
    <title>magic slider</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
    <script src="jquery.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
    <script src="jquery.sliderGo.js"></script>
    <script src="js.js"></script>
    <style>
      div {

      }
      .slider {

      }
      .code-wrapper {
        overflow-y: auto;
        max-height: 800px;
        font-weight: bold;
        border-radius: 15px;
      }
      .code {
        background:black;
        color: greenyellow;
      }
      .curtain{
        width: 400px;
        height: 400px;
        position: relative;
        overflow: hidden;
      }
      .stage {
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .curtain-mini {
        width: 400px;
        height: 70px;
        position: relative;
        overflow: hidden;
      }
      .stage-mini {
        width: 100%;
        position: absolute;
      }
      .item-mini {
        height: 70px;
        width: 100px;
        font-weight: bold;
        color: white;
        background: #9A0;
        position: absolute;
        text-align: center;
        vertical-align: middle;
        border-radius: 15px;
      }
      .item {
        border-radius: 15px;
        font-weight: bold;
        color: white;
        font-size: 1.5em;
        background: #9A0;
        width: 100%;
        height: 100%;
        position: absolute;
        text-align: center;
        vertical-align: middle;
      }
      .slider .navigation {
        top: 30px;
        z-index: 99;
        position: absolute;
      }
      
      .navigation div{
        border-radius: 25px;
        background: white;
        color: #9A0;
        height: 30px;
        font-size: 1em;
        text-align: center;
      }
      .navigation div:hover{
        background: #9A0;
        font-size: 1.5em;
        color: white;
        -moz-user-select: -moz-none;
        -o-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        cursor: default;
      }
      .slider-pager {
        width: 300px;
        list-style: none;
        display: inline;
      }
      .slider-pager-item {
        color: #9A0;
        -moz-user-select: -moz-none;
        -o-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        cursor: default;
        padding: 5px;
        border: 2px solid #9A0;
        font-size: 1em;
        display: inline;
      }
      .slider-pager-item:hover {
        background: #9A0;
        color:white;
      }
    </style>


  </head>
  <body>
    <br />
    <br />
    <div class="container-fluid">
      <div class="row-fluid">
        <div class="span4">
          <div class="slider">
            <div class="curtain">
              <div class="stage">
                <div class="item">
                  item 0
                </div>
                <div class="item">
                  item 1
                </div>
                <div class="item">
                  item 2
                </div>
                <div class="item">
                  item 3
                </div>
                <div class="item">
                  item 4
                </div>
                <div class="item">
                  item 5
                </div>
                <div class="item">
                  item 6
                </div>
                <div class="item">
                  item 7
                </div>
                <div class="item">
                  item 8
                </div>
              </div>
            </div>
            <div class="navigation">
              <div class="btn prev">
                prev
              </div>
              <div class="btn next">
                next
              </div>
            </div>
          </div>
          <div><br /></div>
          <div class="slider-mini">
            <div class="curtain-mini">
              <div class="stage-mini">
                <div class="item-mini">
                  item 0
                </div>
                <div class="item-mini">
                  item 1
                </div>
                <div class="item-mini">
                  item 2
                </div>
                <div class="item-mini">
                  item 3
                </div>
                <div class="item-mini">
                  item 4
                </div>
                <div class="item-mini">
                  item 5
                </div>
                <div class="item-mini">
                  item 6
                </div>
                <div class="item-mini">
                  item 7
                </div>
                <div class="item-mini">
                  item 8
                </div>
              </div>
            </div>
            <div class="navigation">
              <div class="btn prev-mini">
                prev
              </div>
              <div class="btn next-mini">
                next
              </div>
            </div>
          </div>
                    <div class="full btn">
            DO BIGGER
          </div>
        </div>
        

        <div class="span4 offset2">
          Инициализация:<br />
          <div class="code-wrapper">
            <pre class="code">
              <?php echo file_get_contents('js.js'); ?>
            </pre>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
