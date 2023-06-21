class WhatsAppController {
    constructor() {
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }
    
    loadElements() {
        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    elementsPrototype() {
        Element.prototype.hide = function() {
            this.style.display = 'none';
            return this;
        }

        Element.prototype.show = function() {
            this.style.display = 'block';
            return this;
        }

        Element.prototype.toggle = function() {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        }
        
        Element.prototype.on = function(events, fn) {
            events.split(' ').forEach((event) => {
                this.addEventListener(event, fn);
            });
            return this;
        }
        
        Element.prototype.css = function(styles) {
           for (let name in styles) {
            this.style[name] = styles[name];
           }
           return this; 
        }
        
        Element.prototype.addClass = function(name) {
           this.classList.add(name);
           return this;
        }
        
        Element.prototype.removeClass = function(name) {
            this.classList.remove(name);
            return this;
        }
        
        Element.prototype.hasClass = function(name) {
            return this.classList.contains(name);
        }

        HTMLFormElement.prototype.getForm = function() {
            return new FormData(this);
        }

        HTMLFormElement.prototype.toJSON = function() {
            let json = {};

            this.getForm().forEach((value, key) => {
                json[key] = value;
            });

            return json;
        }
    }

    initEvents() {
        this.el.myPhoto.on('click', (event) => {
            this.closeAllLeftPanel()
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300);
        });
        
        this.el.btnNewContact.on('click', (event) => {
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300);
        });
        
        this.el.btnClosePanelEditProfile.on('click', (event) => {
            this.el.panelEditProfile.removeClass('open');
        });

        this.el.btnClosePanelAddContact.on('click', (event) => {
            this.el.panelAddContact.removeClass('open');
        });

        this.el.photoContainerEditProfile.on('click', (event) => {
            this.el.inputProfilePhoto.click();
        });

        this.el.inputNamePanelEditProfile.on('keypress', (event) => {
            if(event.key === 'Enter') {
                event.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }
        });

        this.el.btnSavePanelEditProfile.on('click', (event) => {
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
        });

        this.el.formPanelAddContact.on('submit', (event) => {
            event.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact);
        }); 

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach((item) => {
            item.on('click', (event) => {
                this.el.home.hide();

                this.el.main.css({
                    display: 'flex'
                })
            });
        });

        this.el.btnAttach.on('click', (event) => {
            event.stopPropagation();
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this));
        });

        this.el.btnAttachPhoto.on('click', (event) => {
            console.log('Photo');
        });

        this.el.btnAttachCamera.on('click', (event) => {
            console.log('Camera');
        });

        this.el.btnAttachDocument.on('click', (event) => {
            console.log('Document');
        });

        this.el.btnAttachContact.on('click', (event) => {
            console.log('Contact');
        });
    }

    closeMenuAttach() {
        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');
    }

    closeAllLeftPanel() {
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}