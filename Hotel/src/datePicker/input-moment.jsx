import cx  from 'classnames'
import moment  from 'moment'
import React  from 'react'
import Calendar from './calendar.jsx'
import Time  from './time.jsx'

export default class InputMoment extends React.Component {
    constructor(props) {
        super(props)

        this.handleClickTab = this.handleClickTab.bind(this)
        this.handleSave = this.handleSave.bind(this)

        this.state = {
            tab: 0
        };
    }

    static defaultProps = {
        prevMonthIcon: 'ion-ios-arrow-left',
        nextMonthIcon: 'ion-ios-arrow-right'
    }

    handleClickTab(tab, e) {
        e.preventDefault();
        this.setState({tab: tab});
    }

    handleSave(e) {
        e.preventDefault();
        if (this.props.onSave) this.props.onSave();
    }

    render() {
        var tab = this.state.tab;
        var m = this.props.moment;

        return (
            <div className="m-input-moment">
                <div className="options">
                    <button type="button" className={cx('ion-calendar im-btn', {'is-active': tab === 0})}
                            onClick={this.handleClickTab.bind(null, 0)}>
                        Date
                    </button>
                    <button type="button" className={cx('ion-clock im-btn', {'is-active': tab === 1})}
                            onClick={this.handleClickTab.bind(null, 1)}>
                        Time
                    </button>
                </div>

                <div className="tabs">
                    <Calendar
                        className={cx('tab', {'is-active': tab === 0})}
                        moment={m}
                        onChange={this.props.onChange}
                        prevMonthIcon={this.props.prevMonthIcon}
                        nextMonthIcon={this.props.nextMonthIcon}
                    />
                    <Time
                        className={cx('tab', {'is-active': tab === 1})}
                        moment={m}
                        onChange={this.props.onChange}
                    />
                </div>

                <button type="button" className="im-btn btn-save ion-checkmark"
                        onClick={this.handleSave}>
                    Save
                </button>
            </div>
        );
    }
}



