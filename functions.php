<?php

	function editor_enqueue_scripts(){

		wp_enqueue_script( 'jquery', get_template_directory_uri() . '/assets/js/jquery.js', array('jquery'), NULL, true );

		// wp_enqueue_script( 'cycle-js', get_template_directory_uri() . '/assets/js/jquery.cycle2.min.js', array('jquery'),'1.0', true );

		wp_enqueue_script( 'bootstrap-js', get_template_directory_uri() . '/assets/js/bootstrap.min.js', array('jquery'),'1.0', true );

		wp_enqueue_script( 'main-script', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), NULL, true );

	    wp_enqueue_style( 'bootstrap-css', get_template_directory_uri() . '/assets/css/bootstrap.min.css', '1.0' );

	    wp_enqueue_style( 'main-style', get_template_directory_uri() . '/assets/css/style.css', '1.0' );
	}

	add_action('wp_enqueue_scripts', 'editor_enqueue_scripts');
