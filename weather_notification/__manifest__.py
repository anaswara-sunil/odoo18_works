{
    'name': 'Weather Notification',
    'version': '18.0.1.0.0',
    'description': """ The Weather Notification upon a single click""",
    'depends': ['base','base_setup'],
    'data': [
        'views/res_config_settings.xml',
    ],
    'assets':{
        'web.assets_backend':[
            'weather_notification/static/src/js/icon.js',
            'weather_notification/static/src/xml/systray_icon.xml'
    ]
    }
}
