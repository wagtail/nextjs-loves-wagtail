# Best of both worlds: Next.js ❤️ Wagtail – DjangoCon Europe 2023

> Available online at [thib.me/nextjs](https://thib.me/nextjs) / [github.com/thibaudcolas/nextjs-loves-wagtail](https://github.com/thibaudcolas/nextjs-loves-wagtail).

👋 welcome to our headless CMS workshop! This workshop covers:

- Initial project setup: what Wagtail and Next.js are, and how to set them up
- Connecting Next.js with the backend
- Implementing common website requirements with this architecture
- Deployment!

## Ahead of the workshop

Please make sure to have the following installed:

- [Node.js v18 or v20](https://nodejs.org/) (also includes `npm`)
- [Python v3.8+](https://www.python.org/) (also includes `pip`)
- For deployment: [Vercel CLI](https://vercel.com/docs/cli) (and a [Vercel account](https://vercel.com/signup))

## Introduction

- Requirements (see above)
- [Wagtail](https://wagtail.org/) as a CMS: Django, content models, admin.
- [Next.js](https://nextjs.org/) as a framework: React, routing, server-side rendering, static site generation.

All following sections are self-directed! If you have any questions, please raise your hand or ask in the chat.

## Your first Wagtail site

On the command line, let’s start by creating a folder for our project. We’ll use `myproject` in our examples, you can use something more descriptive if you prefer.

```sh
mkdir myproject
cd myproject
```

If you want to use version control, this is a good time to `git init` a new repository. Here is the `.gitignore` contents we recommend:

```text
__pycache__
env
db.sqlite3
/media
/static
```

### Install and run Wagtail

#### Install dependencies

To check whether you have an appropriate version of Python 3:

```sh
# On Windows with cmd.exe:
py --version
# On other platforms (WSL, Cygwin, GNU/Linux, macOS):
python --version
```

If this does not return a version number or returns a version lower than 3.7, you will need to [install Python 3](https://www.python.org/downloads/).

> 🚧 Note!
> Before installing Wagtail, it is necessary to install the **libjpeg** and **zlib** libraries, which provide support for working with JPEG, PNG, and GIF images (via the Python **Pillow** library).
>
> The way to do this varies by platform—see Pillow's [platform-specific installation instructions](https://pillow.readthedocs.io/en/stable/installation.html#external-libraries).

#### Create and activate a virtual environment

We recommend using a virtual environment, which isolates installed dependencies from other projects. We use [`venv`](https://docs.python.org/3/tutorial/venv.html), which is packaged with Python 3.

**On Windows** (cmd.exe):

```doscon
py -m venv mysite\env
mysite\env\Scripts\activate.bat
# or:
mysite\env\Scripts\activate
```

**On GNU/Linux or macOS** (bash/zsh):

```sh
python -m venv env
source env/bin/activate
```

**For other shells** see the [`venv` documentation](https://docs.python.org/3/library/venv.html).

#### Install Wagtail

Use pip to install Wagtail and its dependencies:

```sh
pip install wagtail
```

#### Generate your site

Wagtail provides a `start` command based on `django-admin startproject`. It will generate a new project with a few Wagtail-specific extras, including the required project settings, a "home" app with a blank `HomePage` model and basic templates, and a sample "search" app.

Run `wagtail start` with a project name (we chose `mysite`, you can choose `myproject`, or something else altogether) and the current directory (`.`):

```sh
wagtail start mysite .
```

#### Install project dependencies

This step isn’t needed if you’ve just installed Wagtail in a virtual environment. If you didn’t, make sure to:

```sh
pip install -r requirements.txt
```

#### Create the database

```sh
python manage.py migrate
```

#### Create an admin user

This will prompt you to create a new superuser account with full permissions. Email is optional. Note the password text won’t be visible when typed, for security reasons.

```sh
python manage.py createsuperuser
```

#### Start the server

```sh
python manage.py runserver
```

Then go to the URL given by `runserver` (in our examples we will use <http://127.0.0.1:8000>). If everything worked, it will show you a welcome page:

![Browser screenshot of "Welcome to your new Wagtail site!" page, with teal egg above the title, and links to different resources. The page is shown inside a browswer tab, with browser URL bar at the top](tutorial_screenshots/wagtail/tutorial_1.png)

You can now access the administrative area at <http://127.0.0.1:8000/admin>. Here’s what it will look like once we start adding content:

![Screenshot of Wagtail’s dashboard, with "Welcome to the mysite Wagtail CMS" heading, 1 page, 0 images, 0 documents. Underneath is a "Your most recent edits" section, with the Home page listed](tutorial_screenshots/wagtail/tutorial_2.png)

### Extend the HomePage model

Out of the box, the "home" app defines a blank `HomePage` model in `models.py`, along with a migration that creates a homepage and configures Wagtail to use it.

Edit `home/models.py` as follows, to add a `body` field to the model:

```python
from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel


class HomePage(Page):
    body = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]
```

`body` is defined as `RichTextField`, a special Wagtail field. When `blank=True`,
it means that this field is not required and can be empty. You
can use any of the [Django core fields](https://docs.djangoproject.com/en/stable/ref/models/fields). `content_panels` define the
capabilities and the layout of the editing interface. When you add fields to `content_panels`, it enables them to be edited on the Wagtail interface. For more information, see [Page models](https://docs.wagtail.org/en/stable/topics/pages.html).

Then run:

```sh
# Creates the migrations file.
python manage.py makemigrations
# Updates the database with your model changes.
python manage.py migrate
```

You must run the above commands each time you make changes to the model definition.

Now edit the homepage within the Wagtail admin area (on the side bar go to _Pages_ and click the edit button beside _Homepage_) to see the new body field. Publish the page by selecting _Publish_ at the bottom of the page editor, rather than _Save Draft_.

We’ll then update `home/templates/home/home_page.html` to contain the following:

```html+django
{% extends "base.html" %}
{% load wagtailcore_tags %}

{% block content %}
    <div class="intro">{{ page.intro|richtext }}</div>
{% endblock %}
```

In the above code, we load [Wagtail’s template tags & filters](https://docs.wagtail.org/en/stable/topics/writing_templates.html#template-tags-filters) using `{% load wagtailcore_tags %}`. This allows the use of the `richtext` filter to escape and print the contents of the `RichTextField`.

![Screenshot of an almost empty page – white background, "Welcome to our new site!" in the top left, and Wagtail logo in circled cyan in the bottom right](tutorial_screenshots/wagtail/tutorial_3.png)

### A basic blog

We are now ready to create a blog. We’ll make a separate app:

```bash
python manage.py startapp blog
```

Add the new `blog` app to `INSTALLED_APPS` in `mysite/settings/base.py`.

#### Blog index

Let's start with a simple index page for our blog. In `blog/models.py`:

```python
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel


class BlogIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro')
    ]
```

Run:

```sh
python manage.py makemigrations
python manage.py migrate
# On Windows:
mkdir blog\templates\blog
type nul > blog\templates\blog\blog_index_page.html
# Other platforms:
mkdir -p blog/templates/blog
touch blog/templates/blog/blog_index_page.html
```

Since the model is called `BlogIndexPage`, we use a template name of `blog_index_page.html`. This default behaviour can be overridden if needed.

In your `blog_index_page.html` file enter the following content:

```html+django
{% extends "base.html" %}
{% load wagtailcore_tags %}

{% block content %}
    <h1>{{ page.title }}</h1>
    <div class="intro">{{ page.intro|richtext }}</div>

    {% for post in page.get_children %}
        <h2><a href="{% pageurl post %}">{{ post.title }}</a></h2>
        {{ post.specific.intro }}
        {{ post.specific.body|richtext }}
    {% endfor %}
{% endblock %}
```

We’ll explain `get_children` a bit later. Note the `pageurl` tag, which is similar to Django's `url` tag but takes a Wagtail Page object as an argument.

From our public homepage <http://127.0.0.1:8000/>, click the Wagtail bird and then "Add a child page".

- Choose "Blog index page" from the list of the page types. If Wagtail shows a 404 – you forgot to make & run migrations!
- Use "Our Blog" as your page title, make sure it has the slug "blog" on the Promote tab, and publish it.

You should now be able to access the url <http://127.0.0.1:8000/blog/> on your site (note how the slug from the Promote tab defines the page URL). If there is a `TemplateDoesNotExist` exception, it means the template is missing or isn’t being picked up by Django.

#### Blog posts

Now we need a model and template for our blog posts. In `blog/models.py`:

```python
from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.search import index


class BlogIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro')
    ]


class BlogPage(Page):
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    body = RichTextField(blank=True)

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
        index.SearchField('body'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        FieldPanel('intro'),
        FieldPanel('body'),
    ]
```

In the model above, we import `index` as this makes the model searchable. You can then list fields that you want to be searchable for the user.

Like for the index page, run:

```sh
python manage.py makemigrations
python manage.py migrate
# On Windows:
type nul > blog\templates\blog\blog_page.html
# Other platforms:
touch blog/templates/blog/blog_page.html
```

Now add the following content to your newly created `blog_page.html` file:

```html+django
{% extends "base.html" %}
{% load wagtailcore_tags %}

{% block content %}
    <h1>{{ page.title }}</h1>
    <p class="meta">{{ page.date }}</p>
    <div class="intro">{{ page.intro }}</div>

    {{ page.body|richtext }}

    <p><a href="{{ page.get_parent.url }}">Return to blog</a></p>
{% endblock %}
```

Note the use of Wagtail's built-in `get_parent()` method to obtain the
URL of the blog this post is a part of.

From <http://127.0.0.1:8000/blog/>, click "Add a child page" again, and this time create a new "Blog Page".

Wagtail gives you full control over what kinds of content can be created under
various parent content types. By default, any page type can be a child of any
other page type.

![Page editor for "First blog post" page, with Post date, Intro, Body fields](tutorial_screenshots/wagtail/tutorial_5.png)

Publish the blog post when you are done editing. Create more if you feel like it (we’ll use three in our examples).

You should now have the very beginnings of a working blog.
Access <http://127.0.0.1:8000/blog/> again and you should see something like this:

![Basic "Our blog" page with three blogs listed, with their title, content](tutorial_screenshots/wagtail/tutorial_7.png)

Titles should link to post pages, and a link back to the blog's
homepage should appear in the footer of each post page.

## Your first Next.js site

Like we used `wagtail start`, Next.js also has a project scaffolding command: `create-next-app`. We'll use this to create a new project:

```bash
npx create-next-app@latest --typescript --eslint --tailwind --use-npm frontend
cd frontend
```

For all prompts, you may use the default: `src/` No, App Router Yes, custom import alias No. We create our Next.js site under `frontend`, so Wagtail and Next.js are clearly separated.

All subsequent commands for the Next.js site will be within `frontend`.

```bash
# Run the development server
npm run dev
```

## Integrating Wagtail and Next.js



## Deployment

We will deploy our Next.js site as a static site on Vercel. Our Wagtail site will not be deployed in this workshop, but you can deploy it by [following the documentation](https://docs.wagtail.org/en/stable/advanced_topics/deploying.html).

Make sure that your Wagtail server is running. Then, run the following command to build your Next.js site:

```bash
vercel build
```

For most prompts, you may use the default:

- Run `vercel pull`? Yes
- Set up `path/to/frontend`? Yes
- You may be asked to sign in to Vercel. Open the provided link to sign in.
- Link to existing project? No
- What's your project's name? Any, e.g. `nextjs-wagtail`
- In which directory is your code located? `./`
- Auto-detected Project Settings (Next.js):
  > - Build Command: `next build`
  > - Development Command: `next dev --port $PORT`
  > - Install Command: `yarn install`, `pnpm install`, or `npm install`
  > - Output Directory: Next.js default
- Want to modify these settings? No

When the build is completed, it should show something like `✅  Build Completed in .vercel/output [4s]`.

Now, run the following command to deploy your Next.js site:

```bash
vercel deploy --prebuilt
```

On a successful deployment, you will be given a production URL. Open it in your browser to see your Next.js site!

### Notes

In this tutorial, the Next.js site is deployed as a static site. This means that the Next.js site is built once, and the built files are served to the user. If you have deployed your Wagtail site, you can use it along with the server-side rendering capabilities of Next.js to create a dynamic site that can be tailored on a per-request basis.
