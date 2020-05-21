import loginImage from '../../assets/images/Login1.jpg'

export default theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: "url(" + loginImage + ")",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '150%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    lanPicker: {
        alignSelf: 'flex-end',
        marginTop: theme.spacing(-5),
        marginRight: theme.spacing(-2)
    },
    mainForm: {
        marginTop: theme.spacing(5),
    },
});