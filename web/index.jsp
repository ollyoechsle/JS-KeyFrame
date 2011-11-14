<!DOCTYPE html>
<html>
<head>
    <title>KeyFrame JS Example</title>
    <link rel="stylesheet" href="css/index.css" type="text/css" />
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
    <script type="text/javascript" src="javascript/util/object.extend.js"></script>
    <script type="text/javascript" src="javascript/util/function.bind.js"></script>
    <script type="text/javascript" src="javascript/util/customevent.js"></script>
    <script type="text/javascript" src="javascript/keyframe.js"></script>
    <script type="text/javascript" src="javascript/context/context.js"></script>
    <script type="text/javascript" src="javascript/context/menucontext.js"></script>
    <script type="text/javascript" src="javascript/mappings/keyboard.js"></script>
    <script type="text/javascript" src="javascript/init.js"></script>
    <script type="text/javascript">

        jQuery(document).ready(function() {
            KF.push(new MenuContext(".menu", "li"));
        });

    </script>
</head>
<body>

<h1>KeyFrame JS Example</h1>

<ul class="menu">
    <li>Menu 1</li>
    <li>Menu 2</li>
    <li>Menu 3</li>
    <li>Menu 4</li>
</ul>

</body>
</html>