<!DOCTYPE html>
<html>
  <head>
    <title>magic slider</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
    <link href="slider-for-task.css" rel="stylesheet" media="screen">
    <link href="marginX.css" rel="stylesheet" media="screen">
    <link href="absolute.css" rel="stylesheet" media="screen">
    <link href="slider-in-slider.css" rel="stylesheet" media="screen">
    <script src="jquery.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
    <script src="jquery.sliderGo.js"></script>
    <script src="js.js"></script>
    <script src="marginX.js"></script>
    <script src="absolute.js"></script>
    <script src="slider-in-slider.js"></script>
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

      hr {
        padding-top: 20px;
        clear: both;
        border-bottom: 2px solid gray;
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
        <div class="span8">
          <p>Два слайдера в одном. Мини-слайдер - является пагинатором для большого слайдера. Есть swipe у большолго слайдера. Поддержка ajax. При нажатии соответсвующей кнопки width/height элемента большого слайдера увеличивается/уменьшается.</p>
          Инициализация:<br />
          <div class="span5">
            <div class="code-wrapper">
              <pre class="code">
<?php echo htmlspecialchars(file_get_contents('slider-for-task.css')); ?>
              </pre>
            </div>
          </div>
          <div class="span5">
            <div class="code-wrapper">
              <pre class="code">
<?php echo htmlspecialchars(file_get_contents('js.js')); ?>
              </pre>
            </div>
          </div>
        </div>
        <hr />
        <div class="row-fluid">
          <div class="span4">
            <div class="margin-slider-x">
              <div class="marginX-display">
                <div class="marginX-wrapper" style="width: 9999px">
                  <div class="marginX-block"></div>
                  <div class="marginX-block"></div>
                  <div class="marginX-block"></div>
                  <div class="marginX-block"></div>
                </div>
              </div>
              <br />
              <div class="direction-button" style="position: relative; z-index: 100">
                <a accesskey="a" href="#" class="go-prev">&larr;</a>
                <a accesskey="d" href="#" class="go-next">&rarr;</a>
              </div>
              <br />
              <ul class="marginX-pager" style="list-style: none;">
              </ul>
            </div>
            <br />
            <br />
            <div class="margin-slider-y">
              <div class="marginY-display">
                <div class="marginY-wrapper" style="width: 9999px">
                  <div class="marginY-block"></div>
                  <div class="marginY-block"></div>
                  <div class="marginY-block"></div>
                  <div class="marginY-block"></div>
                </div>
              </div>
              <br />
              <div class="direction-button" style="position: relative; z-index: 100">
                <a accesskey="a" href="#" class="go-prev">&larr;</a>
                <a accesskey="d" href="#" class="go-next">&rarr;</a>
              </div>
              <br />
              <ul class="marginY-pager" style="list-style: none;">
              </ul>
            </div>
          </div>
          <div class="span8">
            <p>слайдер для перемещения элементов использует маржин. стоит блокировка прокрутки по кругу(первый слайдер). есть прокрутка свайпом.в таймер. пагинатор.</p>
            <div class="span5">
              <div class="code-wrapper">
                <pre class="code">
<?php echo htmlspecialchars(file_get_contents('marginX.css')); ?>
                </pre>
              </div>
            </div>
            <div class="span5">
              <div class="code-wrapper">
                <pre class="code">
<?php echo htmlspecialchars(file_get_contents('marginX.js')); ?>
                </pre>
              </div>
            </div>
          </div>
        </div>
        <hr />
        
        <div class="row-fluid">
          <div class="span4">
            <div class="slider-absolute-x">
            <div class="slider-absolute-x-display-wrapper">
                <div class="slider-absolute-x-display">
                    <div class="slider-absolute-x-display-item" style="background: #ff0;">image 1</div>
                    <div class="slider-absolute-x-display-item" style="width: 140; background: #0ff;">image 2</div>
                    <div class="slider-absolute-x-display-item" style="background: #f0f;">image 3</div>
                    <div class="slider-absolute-x-display-item" style="background: #00f;">image 4</div>
                    <div class="slider-absolute-x-display-item" style="width: 180; background: #f00;">image 5</div>
                </div>
            </div>
            <br /><br />
            <ul class="slider-absolute-x-pager">

            </ul>
            <br /><br />
            <br /><br />
            <div class="slider-direction-button" style="position: relative;">
                <a accesskey="a" href="#" class="go-prev">&larr;</a>
                <a accesskey="d" href="#" class="go-next">&rarr;</a>
            </div>
          </div>
          <br />
          <br />
        <div class="slider-absolute-y">
          <div class="slider-absolute-y-display-wrapper">
              <div class="slider-absolute-y-display">
                  <div class="slider-absolute-y-display-item" style="background: #ff0;">image 1</div>
                  <div class="slider-absolute-y-display-item" style="width: 140; background: #0ff;">image 2</div>
                  <div class="slider-absolute-y-display-item" style="background: #f0f;">image 3</div>
                  <div class="slider-absolute-y-display-item" style="background: #00f;">image 4</div>
                  <div class="slider-absolute-y-display-item" style="width: 180; background: #f00;">image 5</div>
              </div>
          </div>
          <br /><br />
          <ul class="slider-absolute-y-pager">

          </ul>
          <br /><br />
          <br /><br />
          <div class="slider-direction-button" style="position: relative;">
              <a accesskey="a" href="#" class="go-prev">&larr;</a>
              <a accesskey="d" href="#" class="go-next">&rarr;</a>
          </div>
        </div>
        </div>
          <div class="span8">
            <p>Перемещение элементов сталайдера проиходит абсолютно. у пагинатора есть ховер-эффект. ajax.</p>
            <div class="span5">
              <div class="code-wrapper">
                <pre class="code">
<?php echo htmlspecialchars(file_get_contents('absolute.css')); ?>
                </pre>
              </div>
            </div>
            <div class="span5">
              <div class="code-wrapper">
                <pre class="code">
<?php echo htmlspecialchars(file_get_contents('absolute.js')); ?>
                </pre>
              </div>
            </div>
          </div>
        </div>
        </div>
        <hr />
        <div class="row-fluid">
          <div class="span4">
            <div class="slider-absolute-x-in">
            <div class="slider-absolute-x-display-wrapper">
                <div class="slider-absolute-x-display">
                  <div class="margin-slider-in-slider-x slider-absolute-x-display-item">
                    <div class="margin-display">
                        <div class="margin-wrapper" style="width: 9999px">
                            <div class ="testblock-x">test 0
                            </div>
                            <div class ="testblock-x">test 1
                            </div>
                            <div class ="testblock-x">test 2
                            </div>
                            <div class ="testblock-x">test 3
                            </div>
                            <div class ="testblock-x">test 4
                            </div>
                            <div class ="testblock-x">test 5
                            </div>
                            <div class ="testblock-x">test 6
                            </div>
                            <div class ="testblock-x">test 7
                            </div>
                        </div>
                    </div>
                    <div class="direction-button" style="position: relative; z-index: 100">
                        <a accesskey="a" href="#" class="go-prev">&larr;</a>
                        <a accesskey="d" href="#" class="go-next">&rarr;</a>
                    </div>
                </div>
                    <div class="slider-absolute-x-display-item" style="background: #ff0;">image 1</div>
                    <div class="margin-slider-in-slider-x slider-absolute-x-display-item">
                    <div class="margin-display">
                        <div class="margin-wrapper" style="width: 9999px">
                            <div class ="testblock-x">test 0
                            </div>
                            <div class ="testblock-x">test 1
                            </div>
                            <div class ="testblock-x">test 2
                            </div>
                            <div class ="testblock-x">test 3
                            </div>
                            <div class ="testblock-x">test 4
                            </div>
                            <div class ="testblock-x">test 5
                            </div>
                            <div class ="testblock-x">test 6
                            </div>
                            <div class ="testblock-x">test 7
                            </div>
                        </div>
                    </div>
                    <div class="direction-button" style="position: relative; z-index: 100">
                        <a accesskey="a" href="#" class="go-prev">&larr;</a>
                        <a accesskey="d" href="#" class="go-next">&rarr;</a>
                    </div>
                </div>
                    <div class="slider-absolute-x-display-item" style="width: 140; background: #0ff;">image 2</div>
                <div class="slider-absolute-y slider-absolute-x-display-item">
                <div class="slider-absolute-y-display-wrapper">
                    <div class="slider-absolute-y-display">
                        <div class="slider-absolute-y-display-item" style="background: #ff0;">image 1</div>
                        <div class="slider-absolute-y-display-item" style="width: 140; background: #0ff;">image 2</div>
                        <div class="slider-absolute-y-display-item" style="background: #f0f;">image 3</div>
                        <div class="slider-absolute-y-display-item" style="background: #00f;">image 4</div>
                        <div class="slider-absolute-y-display-item" style="width: 180; background: #f00;">image 5</div>
                    </div>
                </div>
                <div class="slider-direction-button" style="position: relative;">
                    <a accesskey="a" href="#" class="go-prev">&larr;</a>
                    <a accesskey="d" href="#" class="go-next">&rarr;</a>
                </div>
              </div>
                    <div class="slider-absolute-x-display-item" style="background: #f0f;">image 3</div>
                    <div class="slider-absolute-x-display-item" style="background: #00f;">image 4</div>
                    <div class="slider-absolute-x-display-item" style="width: 180; background: #f00;">image 5</div>
                </div>
            </div>
            <br /><br />
            <ul class="slider-absolute-x-pager">

            </ul>
            <br /><br />
            <br /><br />
            <div class="slider-direction-button" style="position: relative;">
                <a accesskey="a" href="#" class="go-prev-main">&larr;</a>
                <a accesskey="d" href="#" class="go-next-main">&rarr;</a>
            </div>
          </div>
            </div>
          <div class="span8">
            <p>слайдер для перемещения элементов использует маржин. стоит блокировка прокрутки по кругу(первый слайдер). есть прокрутка свайпом. таймер. пагинатор.</p>
            <div class="span5">
              <div class="code-wrapper">
                <pre class="code">
<?php echo htmlspecialchars(file_get_contents('slider-in-slider.css')); ?>
                </pre>
              </div>
            </div>
            <div class="span5">
              <div class="code-wrapper">
                <pre class="code">
<?php echo htmlspecialchars(file_get_contents('slider-in-slider.js')); ?>
                </pre>
              </div>
            </div>
          </div>
        </div>
        </div>
  </body>
</html>
