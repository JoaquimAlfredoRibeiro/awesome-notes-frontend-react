import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Translate } from 'react-redux-i18n'
import { setLocale } from 'react-redux-i18n'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class LanguagePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            languages: [{ id: 'en', lan: 'global.englishFull' }, { id: 'pt', lan: 'global.portugueseFull' }],
            anchorEl: null
        };


        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    changeLanguage = locale => {
        this.props.actions.setLocale(locale)
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (event) => {
        this.setState({ anchorEl: null });

        //Avoid background clicks registering as changes
        this.state.languages.forEach(lan => {
            return lan.id === event ? this.props.actions.setLocale(event) : ''
        });
    };

    render() {
        const { anchorEl } = this.state;
        const { locale } = this.props

        const currentLocaleShort = () => {
            switch (locale) {
                case 'en':
                    return 'global.englishShort'
                case 'pt':
                    return 'global.portugueseShort'
                default:
                    return 'global.englishShort'
            }
        }

        return (
            <div>
                <Button variant="outlined" size="small" aria-owns={anchorEl ? "simple-menu" : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style={{ marginRight: '10px' }}>
                    <Translate value={currentLocaleShort()} />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    style={{ marginTop: '10px' }}
                >
                    {this.state.languages.map(item => (
                        <MenuItem
                            key={item.id}
                            onClick={(event) => this.handleClose(item.id, event)}>
                            <Translate value={item.lan} />
                        </MenuItem>
                    ))}
                </Menu>
            </div >
        )
    }
}

const mapStateToProps = state => ({ state, locale: state.i18n.locale })

const mapDispatchToProps = dispatch => {
    const actions = {
        setLocale
    }
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePicker)